class HomeController < ApplicationController
  protect_from_forgery with: :null_session
  def index
    # render plain: "Hello, Rails!"
    render plain: "Hello, Rails! #{request.params[:foo]}"
  end

  def post_example
    render plain: "You've hit the create action!"
  end
end
