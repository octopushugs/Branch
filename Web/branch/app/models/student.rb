class Student < ActiveRecord::Base
	has_many :orgs
	has_many :events
end
