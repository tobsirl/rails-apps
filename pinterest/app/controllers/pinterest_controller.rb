class PinterestController < ApplicationController
  def index
    client_id = ENV['PINTEREST_CLIENT_ID']
    redirect_uri = "https://127.0.0.1:3000/oauth/pinterest/oauth_response/"
    puts "client_id: #{client_id}"
    puts "redirect_uri: #{redirect_uri}"
    auth_url = "https://www.pinterest.com/oauth/?client_id=#{client_id}&redirect_uri=#{redirect_uri}&response_type=code&scope=boards:read,pins:read"
    redirect_to auth_url, allow_other_host: true
  end
end
