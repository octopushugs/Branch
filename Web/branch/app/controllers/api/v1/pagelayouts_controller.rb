module Api
	module V1
		class PagelayoutsController < ApplicationController
			def get_orgs
				min_zip = ((params[:zipcode].to_i / 100).floor)*100
				max_zip = min_zip + 99
				
				#Get group list between min and max zipcodes

				groups_list = Org.where(zipcode: min_zip..max_zip)

				if groups_list.first == nil
					render :text => "none"
				else
					@groups_list = groups_list
					render 'pagelayouts/orglist', layout: false
				end
			end

			def get_org_about
				org_info = Org.where(id: params[:orgid]).first
				render :json => org_info
			end
		end
	end
end