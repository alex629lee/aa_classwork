Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users, only: [:index, :show, :create, :update, :destroy]
  resources :artworks, only: [:show, :create, :update, :destroy]

  # GET users/1/artworks 
  resources :users do
    resources :artworks, only: [:index]
  end 

  # /cats/:cat_id/toys/:id
  # resources :cats do 
  #   resources :toys, only: [:index]
  # end 

  resources :artwork_shares, only: [:create, :destroy]

  resources :comments, only: [:create, :destroy]
  resources :users do 
    resources :comments, only: [:index]
  end 
  resources :artworks do 
    resources :comments, only: [:index]
  end 
end
