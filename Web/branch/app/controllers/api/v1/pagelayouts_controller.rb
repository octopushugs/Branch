module Api
	module V1
		class PagelayoutsController < ApplicationController
			def get_orgs
				min_zip = ((params[:zipcode].to_i / 100).floor)*100
				max_zip = min_zip + 99
				
				#Get group list between min and max zipcodes

				@groups_list = Org.where(zipcode: min_zip..max_zip)

				#Render out view

				render :file => 'pagelayouts/orglist.html.erb', layout: false
			end
		end
	end
end