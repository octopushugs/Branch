class Event < ActiveRecord::Base
	belongs_to :orgs
	has_many :students
end
