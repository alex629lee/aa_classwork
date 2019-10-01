# == Schema Information
#
# Table name: artworks
#
#  id        :integer(8)      not null, primary key
#  title     :string          not null
#  image_url :string          not null
#  artist_id :integer(4)      not null
#

class Artwork < ApplicationRecord
    # validates :username, presence: true, uniqueness: true 
    validates :title, presence: true
    validates :image_url, presence: true
    validates :artist_id, presence: true, uniqueness: {scope: :title}

    belongs_to :artist,
        foreign_key: :artist_id,
        class_name: :User

    has_many :artwork_shares, 
        foreign_key: :artwork_id,
        class_name: :ArtworkShare
    
    has_many :shared_viewers, 
        through: :artwork_shares, 
        source: :viewer 

    has_many :comments,
        foreign_key: :artwork_id,
        class_name: :Comment,
        dependent: :destroy
end
