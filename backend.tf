terraform {
  backend "gcs" {
    bucket = "backend-for-terraform"
    prefix = "terraform/state"
  }
}
