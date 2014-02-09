module Api
	module V1
		class PagelayoutsController < ApplicationController
			def get_orgs
				render :file => 'pagelayouts/orglist.html.erb', layout: false
			end
		end
	end
end