require "test_helper"

class PinterestControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pinterest_index_url
    assert_response :success
  end
end
