resource "google_secret_manager_secret" "secret-basic" {
  secret_id = "secret-testin"

  labels = {
    label = "secretscan"
  }

  replication {
    user_managed {
      replicas {
        location = "us-central1"
      }
      replicas {
        location = "us-east1"
      }
    }
  }
}

resource "google_secret_manager_secret_version" "secret-version-basic" {
  secret = google_secret_manager_secret.secret-basic.id

  secret_data = "AIzaSyAUwMfKOCoQOfabBKTqlaxOJBfVZucbKaQ"
}
