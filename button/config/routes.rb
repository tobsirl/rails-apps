Rails.application.routes.draw do
  # Route for the upvote_post_path for the put method
  # /posts/:id/upvote => posts#upvote
  put 'posts/:id/upvote', to: 'pages#upvote', as: 'upvote_page'
  root 'pages#home'
  resources :posts
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
