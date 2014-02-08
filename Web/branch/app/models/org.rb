class Org < ActiveRecord::Base
	has_many :events
	has_many :students
end
