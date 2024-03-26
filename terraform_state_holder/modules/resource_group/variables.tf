variable "rg-tf-storage" {
  default = "rg-tf-storage"
  type = string
  description = "Resource group for Terraform State File"
}

variable "rg-tf-storage-location" {
  default = "Central India"
  type = string
  description = "Location of Resource group for Terraform State File"
}