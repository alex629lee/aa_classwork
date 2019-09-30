# == Schema Information
#
# Table name: users
#
#  id         :integer(8)      not null, primary key
#  name       :string          not null
#  email      :string          not null
#  created_at :datetime        not null
#  updated_at :datetime        not null
#

class User < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true
end