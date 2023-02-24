Rails.application.routes.draw do
  root "posts#index"
  # resources :posts

  # All posts route
  get "/posts", to: "posts#index"

  # New post route

  # Create post route

  # Show post route

  # Edit post route

  # Update post route

  # Delete post route

end
