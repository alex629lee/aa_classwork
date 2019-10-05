class UsersController < ApplicationController 

    def show 
        @user = User.find(params[:id])
        render :show
    end 

    def new 
        @user = User.new 
        render :new 
    end 

    def create 
        @user = User.new(user_params) 
        # @user.password = params[:password]
        
        if @user.save
            flash[:success] = "Account successfully created!"
            login_user!(@user)
            redirect_to user_url(@user)
        else 
            
            flash[:errors] = @user.errors.full_messages
            # fail
            render :new 
        end 
    end 

    private 
    def user_params
        params.require(:user).permit(:email, :password)
    end 
end 