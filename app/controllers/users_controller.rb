class UsersController < ApiController
  before_action :require_login, except: [:create]

  def create
    puts "test #{user_params}"
    user = User.create!(user_params)
    render json: { token: user.auth_token }
  end

  def profile
    user = User.find_by_auth_token!(request.headers[:token])
    user_things = Thing.where(user_id: user.id)
    render json: {
      user: { username: user.username, email: user.email, name: user.name },
      things: user_things
    }
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :name)
  end

end
