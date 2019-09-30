Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users 

  # get "/users", to: "users#index"
  # post "/users", to: "users#create"
  # get "/users/:id", to: "users#show"
  # get "/users/new", to: "users#new"
end

