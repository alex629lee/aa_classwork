# == Schema Information
#
# Table name: artwork_shares
#
#  id         :integer(8)      not null, primary key
#  artwork_id :integer(4)      not null
#  viewer_id  :integer(4)      not null
#  created_at :datetime        not null
#  updated_at :datetime        not null
#

class ArtworkShare < ApplicationRecord
    validates :artwork_id, presence: true
    validates :viewer_id, presence: true, uniqueness: {scope: :artwork_id}

    belongs_to :artwork, 
        foreign_key: :artwork_id,
        class_name: :Artwork
    

    belongs_to :viewer,
        foreign_key: :viewer_id,
        class_name: :User

    
end