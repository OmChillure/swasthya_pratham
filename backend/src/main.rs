use actix_web::{cookie::Cookie, HttpRequest, HttpResponse, HttpServer, Responder, web, App};
use serde::{Serialize, Deserialize};
use mongodb::{Client, Collection};
use actix_cors::Cors;
use bson::doc;
use dotenv::dotenv;
use std::env;

#[derive(Debug, Serialize, Deserialize)]
struct User {
    name: String,
    username: String,
    email: String,
    password: String,
    phone: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Login {
    email: String,
    password: String,
}

async fn register(user: web::Json<User>, collection: web::Data<Collection<User>>) -> impl Responder {
    let user = user.into_inner();
    let result = collection.insert_one(user, None).await;

    match result {
        Ok(_) => HttpResponse::Ok().body("User Registered Successfully"),
        Err(_) => HttpResponse::InternalServerError().body("Error registering user"),
    }
}

async fn login(user: web::Json<Login>, collection: web::Data<Collection<User>>) -> impl Responder {
    let user = user.into_inner();
    let filter = doc! { "email": &user.email, "password": &user.password };
    let result = collection.find_one(filter, None).await;

    match result {
        Ok(Some(_)) => {
            let cookie = Cookie::build("user_email", user.email.clone())
                .path("/")
                .http_only(true)
                .finish();
            println!("{:?}", cookie);
            HttpResponse::Ok()
                .cookie(cookie)
                .body("Login Successful")
        },
        Ok(None) => HttpResponse::Unauthorized().body("Invalid Credentials"),
        Err(_) => HttpResponse::InternalServerError().body("Login Error"),
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    let mongo_uri = env::var("MONGO_URI").expect("MONGO_URI must be set in .env file");

    let client = Client::with_uri_str(&mongo_uri)
        .await
        .expect("Failed to initialize MongoDB client");

    let db = client.database("rust_auth");
    let collection: Collection<User> = db.collection("users");

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_header()
            .allow_any_method()
            .allow_any_origin()
            .supports_credentials() // Allow credentials if needed
            .max_age(3600);

        App::new()
            .app_data(web::Data::new(collection.clone()))
            .wrap(cors)
            .route("/register", web::post().to(register))
            .route("/login", web::post().to(login))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
