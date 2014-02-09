class AddTimezoneToStudentsandOrgs < ActiveRecord::Migration
  def change
  	add_column :students, :timezone, :string
  end
end
