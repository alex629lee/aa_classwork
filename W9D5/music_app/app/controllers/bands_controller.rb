class BandsController < ApplicationController
   
    def index 
        @bands = Band.all 
        render :index 
    end 

    def show 
        @band = Band.find(params[:id])
        render :show
    end 


    def new 
        @band = Band.new 
        render :new
    end 


    def create
        band = Band.new(band_params)
        if band.save
            flash[:success] = "Successfully created band."
            # fail
            redirect_to band_url(@band)
        else  
            flash[:error] = "Unable to create the band, please try again."
            render :new
        end 
    end 


    def destroy 
        @band.destroy
    end 


    def edit 
        @band = Band.find(params[:id])
        render :edit 
    end 


    def update 
        @band = Band.find(params[:id])
        @band.update(band_params)
        if @band.save
            flash[:success] = "Successfully edited band."
        end 
        redirect_to band_url(@band)
    end 


    private
    def band_params
        params.require(:band).permit(:name)
    end 
end 