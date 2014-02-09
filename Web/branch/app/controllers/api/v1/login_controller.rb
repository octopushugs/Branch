module Api
	module V1
		class LoginController < ApplicationController
			def check_login
				student_check = Student.where(username: params[:username], password: params[:password]).first

				if student_check == nil
					render :text => "none"
				else
					render :json => student_check
				end
			end
		end
	end
end
