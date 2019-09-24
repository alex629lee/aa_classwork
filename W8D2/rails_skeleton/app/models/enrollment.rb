# == Schema Information
#
# Table name: enrollments
#
#  id         :bigint           not null, primary key
#  course_id  :integer
#  student_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Enrollment < ApplicationRecord

  # for belongs_to: 
    #   primary_key references foreign table 
    #   foreign_key will reference own table 

    #   belongs_to(:course,
    #   {
    #       :class_name => :course,
    #       :primary_key => :id,
    #       :foreign_key => :course_id
    #   })

  belongs_to :course,
    class_name: :Course,
    primary_key: :id,
    foreign_key: :course_id

  belongs_to :user,
    class_name: :User,
    primary_key: :id,
    foreign_key: :student_id

end
