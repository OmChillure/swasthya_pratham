use actix_web::{cookie::Cookie, web, App, HttpResponse, HttpServer, Responder};
use serde::{Serialize, Deserialize};
use mongodb::{Client, Collection, bson::doc};
use actix_cors::Cors;
use dotenv::dotenv;
use std::env;
use uuid::Uuid;
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

#[derive(Debug, Serialize,Deserialize, Clone)]
struct UploadFile {
    name: String,
    descr: String,
    email: String,
    url: String,
}

async fn get_todo(
    todo_collection: Data<Collection<TodoItem>>
) -> impl Responder {
    let mut cursor = todo_collection.find(None, None).await.unwrap();
    let mut todos: Vec<TodoItem> = Vec::new();

    while let Some(result) = cursor.try_next().await.unwrap() {
        todos.push(result);
    }
    HttpResponse::Ok().json(todos)
}

async fn create_todo(
    item: web::Json<CreateItem>,
    todo_collection: Data<Collection<TodoItem>>,
) -> impl Responder {
    let new_todo = TodoItem {
        id: Uuid::new_v4(),
        title: item.title.clone(),
        description: item.description.clone(),
        completed: item.completed,
    };

    let result = todo_collection.insert_one(new_todo.clone(), None).await;

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
    todo_collection: Data<Collection<TodoItem>>,
) -> impl Responder {
    let filter = doc! { "id": path.to_string() };
    let result = todo_collection.delete_one(filter, None).await;

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
    user_collection: Data<Collection<User>>
) -> impl Responder {
    let result = user_collection.insert_one(user.into_inner(), None).await;

    match result {
        Ok(_) => HttpResponse::Ok().body("User Registered Successfully"),
        Err(_) => HttpResponse::InternalServerError().body("Error registering user"),
    }
}

async fn login(
    user: web::Json<Login>,
    user_collection: Data<Collection<User>>
) -> impl Responder {
    let filter = doc! { "email": &user.email, "password": &user.password };
    let result = user_collection.find_one(filter, None).await;

    match result {
        Ok(Some(_)) => {
            let cookie = Cookie::build("user_email", user.email.clone())
                .path("/")
                .http_only(true)
                .finish();
            HttpResponse::Ok()
                .cookie(cookie)
                .body(user.email.clone())
        },
        Ok(None) => HttpResponse::Unauthorized().body("Invalid Credentials"),
        Err(_) => HttpResponse::InternalServerError().body("Login Error"),
    }
}

async fn get_files(
    upload_collection: Data<Collection<UploadFile>>,
) -> impl Responder {
    let mut cursor = upload_collection.find(None,None).await.unwrap();
    let mut uploads: Vec<UploadFile> = Vec::new();

    while let Some(result) = cursor.try_next().await.unwrap() {
        uploads.push(result);
    }
    HttpResponse::Ok().json(uploads)
}

async fn upload_file(
    file: web::Json<UploadFile>,
    upload_collection: Data<Collection<UploadFile>>,
) -> impl Responder {
    let result = upload_collection.insert_one(file.into_inner(), None).await;

    match result {
        Ok(_) => HttpResponse::Ok().body("File Uploaded Successfully"),
        Err(_) => HttpResponse::InternalServerError().body("Error uploading file"),
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
    let user_collection: Collection<User> = db.collection("users");
    let todo_collection: Collection<TodoItem> = db.collection("todo_item");
    let upload_collection: Collection<UploadFile> = db.collection("upload_file");

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
            .app_data(Data::new(upload_collection.clone()))
            .wrap(cors)
            .route("/register", web::post().to(register))
            .route("/login", web::post().to(login))
            .route("/todos", web::get().to(get_todo))
            .route("/todos", web::post().to(create_todo))
            .route("/todos/{id}", web::delete().to(delete_todo))
            .route("/upload", web::get().to(get_files))
            .route("/upload", web::post().to(upload_file))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}