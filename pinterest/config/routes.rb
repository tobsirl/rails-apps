Rails.application.routes.draw do
  # pinterest index controller
  get 'pinterest/index' => 'pinterest#index'
  get 'pinterest/auth' => 'pinterest#index'
  root 'pages#home'
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
