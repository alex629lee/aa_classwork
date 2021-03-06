class UsersController < ApplicationController

  def new
    # debugger
    render :new
  end

  def create
    user = User.new(user_params)
    if user.save
      redirect_to user_url(user)
    else
      render :new
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end 

end