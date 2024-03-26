terraform {
  backend "azurerm" {
    resource_group_name = "rg-tf-storage"
    storage_account_name = "strtf"
    container_name = "tfstoragecontainer"
    key = "terraform_state"
  }
}