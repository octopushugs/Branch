require 'test_helper'

class HomeControllerTest < ActionController::TestCase
  test "should get e" do
    get :e
    assert_response :success
  end

end
