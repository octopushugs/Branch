class CreateStudentOrgLts < ActiveRecord::Migration
  def change
    create_table :student_org_lts do |t|

      t.timestamps
    end
  end
end
