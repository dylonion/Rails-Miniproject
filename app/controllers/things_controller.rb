class ThingsController < ApiController
  before_action :require_login, except: [:index, :show]

  def index
    things = Thing.all
    render json: { things: things }
  end

  def show
    thing = Thing.find(params[:id])
    thing_user = thing.user
    render json: {thing: thing, username: thing_user.username}
  end

  def create
    thing = Thing.new(thing_params)
    thing.user = current_user

    if thing.save
      render json: {
        message: 'ok',
        thing: thing,
      }
    else
      render json: {message: 'Could not create that thing'}
    end
  end

  private
  def thing_params
    params.require(:thing).permit(:name, :description)
  end


end
