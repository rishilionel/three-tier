variable "keyvault-name" {
  default = "kv-tf-threetiertesting"
}

variable "keyvault-rg" {
  default = "rg-tf-storage"
}

variable "kv-db" {
  default = "Postgresql-Password"
}

variable "psql-name" {
  default = "psql-three-tier-testing1"
}

variable "psql-rg" {
  default = "rg-three-tier"
}

variable "psql-location" {
  default = "Central India"
}

variable "psql-version" {
  default = "16"
}

variable "psql-admin" {
  default = "Rishi"
}

variable "psql-storage" {
  type = number
  default = 32768
}

variable "psql-sku" {
  default = "B_Standard_B1ms"
}

variable "psql-db-name" {
  default = "book"
}

variable "psql-db-collation" {
  default = "en_US.utf8"
}

variable "psql-db-charset" {
  default = "utf8"
}