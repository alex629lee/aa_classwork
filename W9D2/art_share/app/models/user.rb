# == Schema Information
#
# Table name: users
#
#  id         :integer(8)      not null, primary key
#  created_at :datetime        not null
#  updated_at :datetime        not null
#  username   :string          not null
#

class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true 
#   validates_uniqueness_of :username 

  has_many :artworks,
      foreign_key: :artist_id,
      class_name: :Artwork

  has_many :artwork_shares,
      foreign_key: :viewer_id,
      class_name: :ArtworkShare

  has_many :shared_artworks,
      through: :artwork_shares,
      source: :artwork

  has_many :comments,
    foreign_key: :user_id,
    class_name: :Comment,
    dependent: :destroy
end