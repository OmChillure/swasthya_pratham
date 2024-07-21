use actix_web::{cookie::Cookie, web, App, HttpResponse, HttpServer, Responder};
use serde::{Serialize, Deserialize};
use mongodb::{Client, Collection, bson::{doc, Document, Bson}};
use actix_cors::Cors;
use dotenv::dotenv;
use std::env;
use uuid::Uuid;
use std::sync::Mutex;
use futures::stream::TryStreamExt;
use actix_web::web::Data;

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

#[derive(Serialize, Deserialize, Clone)]
struct TodoItem {
    id: Uuid,
    title: String,
    description: String,
    completed: bool,
}

#[derive(Deserialize)]
struct CreateItem {
    title: String,
    description: String,
    completed: bool,
}

#[derive(Debug, Serialize, Deserialize,Clone)]
struct UploadFile{
    title : String,
    description : String,
    email: String,
    url : String,
}

async fn get_todo(
    collection: Data<Collection<Document>>
) -> impl Responder {
    let mut cursor = collection.find(None, None).await.unwrap();
    let mut todos: Vec<TodoItem> = Vec::new();

    while let Some(doc) = cursor.try_next().await.unwrap() {
        if let Ok(todo) = bson::from_bson::<TodoItem>(Bson::Document(doc)) {
            todos.push(todo);
        }
    }
    HttpResponse::Ok().json(todos)
}

async fn create_todo(
    item: web::Json<CreateItem>,
    collection: Data<Collection<Document>>,
) -> impl Responder {
    let new_todo = TodoItem {
        id: Uuid::new_v4(),
        title: item.title.clone(),
        description: item.description.clone(),
        completed: item.completed,
    };

    let new_todo_doc = bson::to_document(&new_todo).unwrap();
    let result = collection.insert_one(new_todo_doc, None).await;

    match result {
        Ok(_) => HttpResponse::Ok().json(new_todo),
        Err(e) => {
            eprintln!("Failed to add todo: {:?}", e);
            HttpResponse::InternalServerError().body("Failed to add todo")
        }
    }
}

async fn delete_todo(
    path: web::Path<Uuid>,
    collection: Data<Collection<Document>>,
) -> impl Responder {
    let filter = doc! { "id": path.to_string() };
    let result = collection.delete_one(filter, None).await;

    match result {
        Ok(delete_result) => {
            if delete_result.deleted_count == 1 {
                HttpResponse::Ok().body("Todo deleted successfully")
            } else {
                HttpResponse::NotFound().body("Todo not found")
            }
        },
        Err(e) => {
            eprintln!("Failed to delete todo: {:?}", e);
            HttpResponse::InternalServerError().body("Failed to delete todo")
        }
    }
}

async fn register(
    user: web::Json<User>,
    collection: Data<Collection<Document>>
) -> impl Responder {
    let user_doc = bson::to_document(&user.into_inner()).unwrap();
    let result = collection.insert_one(user_doc, None).await;

    match result {
        Ok(_) => HttpResponse::Ok().body("User Registered Successfully"),
        Err(_) => HttpResponse::InternalServerError().body("Error registering user"),
    }
}

async fn login(
    user: web::Json<Login>,
    collection: Data<Collection<Document>>
) -> impl Responder {
    let filter = doc! { "email": &user.email, "password": &user.password };
    let result = collection.find_one(filter, None).await;

    match result {
        Ok(Some(_)) => {
            let cookie = Cookie::build("user_email", user.email.clone())
                .path("/")
                .http_only(true)
                .finish();
            HttpResponse::Ok()
                .cookie(cookie)
                .body("Login successful")
        },
        Ok(None) => HttpResponse::Unauthorized().body("Invalid Credentials"),
        Err(_) => HttpResponse::InternalServerError().body("Login Error"),
    }
}


async fn upload_file() => impl Responder {
    
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    let mongo_uri = env::var("MONGO_URI").expect("MONGO_URI must be set in .env file");

    let client = Client::with_uri_str(&mongo_uri)
        .await
        .expect("Failed to initialize MongoDB client");

    let db = client.database("rust_auth");
    let user_collection: Collection<Document> = db.collection("users");
    let todo_collection: Collection<Document> = db.collection("todo_item");
    let file_upload: Collection<Document> = db.collection("files");

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_header()
            .allow_any_method()
            .allow_any_origin()
            .supports_credentials()
            .max_age(3600);

        App::new()
            .app_data(Data::new(user_collection.clone()))
            .app_data(Data::new(todo_collection.clone()))
            .app_data(Data::new(file_upload.clone()))
            .wrap(cors)
            .route("/register", web::post().to(register))
            .route("/login", web::post().to(login))
            .route("/todos", web::get().to(get_todo))
            .route("/todos", web::post().to(create_todo))
            .route("/todos/{id}", web::delete().to(delete_todo))
            .route("/upload", web::post().to(upload_file))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
