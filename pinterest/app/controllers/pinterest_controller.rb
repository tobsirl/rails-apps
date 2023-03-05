class PinterestController < ApplicationController
  def index
    client_id = ENV['PINTEREST_CLIENT_ID']
    puts "client_id: #{client_id}"
  end
end
