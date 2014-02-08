module Api
	module V1
		class StudentController < ApplicationController
			
			def index

			end

			def show
				
			end

			def student_groups
			
			end

			def create
				student = Student.new
				student.username = params[:username]
				student.password = params[:password]
				student.email = params[:email]
				student.dob = params[:dob]
				student.city = params[:city]
				student.phone = params[:phone]
				student.full_name = params[:full_name]
				student.zipcode = params[:zipcode]

				student.save

			end
		
			private
				def student_params
					params.require(:student).permit(:password, :email, :dob, :city, :phone, :full_name)
			
		end
	end
end
