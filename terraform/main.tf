module "rg" {
  source = "./modules/azure_resource_group"
}

module "acr" {
  source = "./modules/azure_container_registry"
  depends_on = [ module.rg ]
}

module "psql" {
  source = "./modules/azure_postgre_sql"
  depends_on = [ module.rg ]
}

module "app-plan" {
  source = "./modules/azure_app_service_plan"
  depends_on = [ module.rg ]
}

module "app-service-backend" {
  source = "./modules/azure_app_service_backend"
  depends_on = [ module.app-plan ]
  plan-id = module.app-plan.plan-id
  registry_url = module.acr.acr-url
  registry_user = module.acr.acr_user_name
  registry_password = module.acr.acr_user_password
}

module "app-service-frontend" {
  source = "./modules/azure_app_service_frontend"
  depends_on = [ module.app-plan ]
  plan-id = module.app-plan.plan-id
  registry_url = module.acr.acr-url
  registry_user = module.acr.acr_user_name
  registry_password = module.acr.acr_user_password
}