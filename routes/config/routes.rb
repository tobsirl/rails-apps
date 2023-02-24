Rails.application.routes.draw do
  get 'comments/index'
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

  # Patch post route
  put "/posts/:id", to: "posts#update"

  # Delete post route
  delete "/posts/:id", to: "posts#destroy"

  resources :posts do
    # Nested comments route
    # all comments routes will be prefixed with /posts/:post_id
    get "/comments", to: "comments#index"
  end

end
