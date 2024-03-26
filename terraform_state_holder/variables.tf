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


variable "strtf_name" {
  default = "strtf"
  description = "Name of Storage Account for the purpose of Terraform"
  type = string
}

variable "strtf_account_tier" {
  default = "Standard"
  description = "Account_Tier of Storage Account for the purpose of Terraform"
  type = string
}

variable "strtf_account_replication_type" {
  default = "LRS"
  description = "Account_Replication_Type of Storage Account for the purpose of Terraform"
  type = string
}

variable "strtf_location" {
  default = "Central India"
  description = "Location of Storage Account for the purpose of Terraform"
  type = string
}

variable "tf_storage_container" {
  default = "tfstoragecontainer"
  type = string
}
