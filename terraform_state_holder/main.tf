module "resource_group" {
  source = "./modules/resource_group"
}

module "storage_account" {
  source = "./modules/storage_account"
  strtf_rg_name = module.resource_group.rg-tf-storage
  depends_on = [ module.resource_group ]
}

module "storage_account_container" {
  source = "./modules/storage_account_container"
  tf_storage_name = module.storage_account.storage_account_name
  depends_on = [ module.storage_account ]
}

module "kv-tf" {
  source = "./modules/key_vault"
  kv-resource_group_name = module.resource_group.rg-tf-storage
  depends_on = [ module.resource_group ]
}