class ArtworksController < ApplicationController
  def index
    # users/9/artworks  params= { :artwork=> {:title=>"", ...}, :user_id=>9 }
    user = User.find(params[:user_id]) 
    # artworks = user.artworks
    # artworks.concat(user.shared_artworks) 
    render json: (user.artworks + user.shared_artworks)
  end

  def create 
    artwork = Artwork.new(artwork_params)
    if artwork.save
        render json: artwork
    else 
        render json: artwork.errors.full_messages, status: :unprocessable_entity
    end 
  end

  def show 
    artwork = Artwork.find(params[:id])
    render json: artwork 
  end

  def update 
    artwork = Artwork.find(params[:id]) 
    if artwork.update(artwork_params)
        render json: artwork
    else  
        render json: artwork.errors.full_messages, status: 422
    end 
  end

  def destroy
    artwork = Artwork.find(params[:id])
    artwork.destroy 

    render plain: "Successfully destroyed the user."
  end

  private 
  def artwork_params 
    params.require(:artwork).permit(:title, :image_url, :artist_id)
  end 

end 