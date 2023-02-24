Rails.application.routes.draw do
  root "posts#index"
  # resources :posts

  # All posts route
  get "/posts", to: "posts#index"

  # New post route
  get "/posts/new", to: "posts#new", as: "new_post"

  # Create post route
  post "/posts", to: "posts#create"

  # Show post route
  get "/posts/:id", to: "posts#show", as: "post"

  # Edit post route
  get "/posts/:id/edit", to: "posts#edit", as: "edit_post"

  # Update post route
  patch "/posts/:id", to: "posts#update"

  # Delete post route

end
