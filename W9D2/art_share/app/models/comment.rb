# == Schema Information
#
# Table name: comments
#
#  id         :integer(8)      not null, primary key
#  user_id    :integer(4)      not null
#  artwork_id :integer(4)      not null
#  body       :text            not null
#  created_at :datetime        not null
#  updated_at :datetime        not null
#

class Comment < ApplicationRecord
  validates :user_id, presence: true
  validates :artwork_id, presence: true 
  validates :body, presence: true
  
  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :artwork,
    foreign_key: :artwork_id,
    class_name: :Artwork
end 
