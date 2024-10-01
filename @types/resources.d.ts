interface Resources {
  common: {
    title: 'CSV Random Selector';
    description: 'This application allows you to upload a CSV file; select random records; and display the information of each record in a modal.';
    loaded_records: 'Loaded records: ';
    select_random_record: 'Select Random Record';
    no_more_records: 'No more records available.';
    btn_close: 'close';
    btn_upload: 'Drag and drop your CSV file here or click to upload.';
    btn_clean: 'Remove';
    btn_accept: 'Acept';
    pick_color: 'Pick a color';
  };
  index: {
    description: 'A client page; to demonstrate client side i18n';
    title: 'Client page';
    keywords: 'client; page; i18n';
  };
  login: {
    description: 'A client page; to demonstrate client side i18n';
    title: 'Client page';
    keywords: 'client; page; i18n';
    title_form: 'Login';
    user_form: 'Username';
    pass_form: 'Password';
    btn_form: 'Login';
    forget_pass: 'Forgot the password';
    error_user: 'Username is required';
    error_pass: 'Password is required';
    login_success: 'Login successful';
    error_login: 'Login failed';
  };
  layoutLogin: {
    description: 'A client page; to demonstrate client side i18n';
    title: 'Client page';
    keywords: 'client; page; i18n';
    sign_in: 'SIGN IN TO PLANIFIA';
    welcome_message: 'Welcome; We are glad to see you again!';
    copy_right: 'All Rights Reserved';
  };

  layoutResetPassword: {
    description: 'A client page; to demonstrate client side i18n';
    title: 'Reset Password page';
    keywords: 'client; page; i18n';
    header_message: 'Recupera tu cuenta';
    reset_password_message: 'Establece una nueva contraseña';
  };

  resetPassword: {
    title: 'Reset Password';
    description: 'A client page; to demonstrate client side i18n';
    keywords: 'client; page; i18n';
    title_form: 'Reset Your Password';
    new_pass_form: 'New Password';
    confirm_pass_form: 'Confirm Password';
    btn_form: 'Reset Password';
    btn_back_login: 'Back to login';
    message_password: "Make sure it's at least 20 characters OR at least 8 characters";
    message_succes: 'Password reset successfully!; please go back to login';
    error_pass: 'Please; enter your new password';
    error_pass_min: 'The password must be at least 6 characters long';
    error_confirm_pass: 'Please confirm your password';
    error_pass_match: 'Passwords do not match';
    error_reset: 'Error resetting password';
    error_pass_already_reset: 'Password reset already done';
    reset_success: 'Password reset successfully!';
    check_email_message: 'Please check your email for a link to reset your password';
    error_invalid_token: 'Invalid token';
  };

  requestResetPassword: {
    title: 'Request Password Reset';
    description: 'A client page to demonstrate client-side i18n';
    keywords: 'reset; password; request';
    title_form: 'Request Password Reset';
    email_form: "Enter your user account's verified email address";
    btn_form: 'Send Email';
    close: 'Close';
    btn_back_login: 'Back to login';
    error_invalid_email: 'Please enter a valid email address';
    error_email_required: 'The email is required';
    error_reset_request: 'Error sending password reset request';
    error_email_not_found: 'User login with this email not found';
    email_sent: "Email sent; please see your email and follow the instructions; if you don't see the email; please check your spam folder";
    reset_request_success: 'Password reset request sent successfully!';
  };

  sites: {
    layout_title_list: "List Sites";
    layout_title_manage: "Manage Sites";
    all: "All";
    create: "Create";
    not_results: "No results found";
    filter_by_name: "Filter name...";
    filter_by_status: "Filter by status";
    filter_by_createdAt: "Filter by date";
    error_fetching_sites: "Error fetching sites";
    new_site: "New Site";
    message_create_site: "Fill out the following form to create a new site. Click 'Create' when you're done.";
    name: "Name";
    description: "Description";
    primaryColor: "Primary Color";
    secondaryColor: "Secondary Color";
    template: "Template Color";
    logo: "Logo";
    status: "Status";
    createdAt: "Created At";
    updatedAt: "Updated At";
    ph_name: "Enter site name";
    ph_description: "Enter site description";
    ph_primaryColor: "Enter primary color";
    ph_secondaryColor: "Enter secondary color";
    ph_logo: "Enter file image";
    ph_template: "Select template color";
    purple_white: "Purple and White";
    blue_white: "Blue and White";
    active: "Active";
    inactive: "Inactive";
    btn_create: "Create";
    error_name: "Name is required";
    error_status: "Status is required";
    error_name_spaces: "Name cannot contain spaces";
    invalid_url: "Invalid URL";
    site_created: "Site created";
    select_status: "Select a status";
    actions: "Actions";
    site_updated: "Site updated";
    update_site: "Update Site";
    update_site_description: "Update the site information";
    update: "Update";
    change_status_description: "Are you sure you want to change the status of the site?";
    desactivate_site: "Desactivate Site";
    desactivate: "Desactivate";
    activate: "Activate";
    activate_site: "Activate Site";
    error_invalid_file_type: "The image must be in JPEG or PNG format";
    error_file_too_large: "The image must be less than 2MB";
  };

  dashboardIcons: {
    settings: 'Icon Settings';
    notifications: 'Icon Notifications';
    search: 'Icon Search';
    language: 'Icon Language';
    profile: 'Icon Profile';
  };

  dashboardDirection: {
    dashboard: 'Dashboard';
    home: 'Home';
    users: 'User';
    dates: 'Dates';
    settings: 'Settings';
    clients: 'Clients';
    schedule: 'Schedule';
    dates: 'Dates';
    create: 'Create';
    create_user: 'Create User';
    view_schedule: 'View Schedule';
    add_appointment: 'Add Appointment';
    manage_clients: 'Manage Clients';
    clients_list: 'Client List';
    system_users: 'System Users';
    manage_users: 'Manage Users';
    users_list: 'User List';
    reports: 'Reports';
    client_report: 'Client Report';
    appointment_report: 'Appointment Report';
    administration: 'Administration';
    profile: 'Profile';
    change_password: 'Change Password';
    email_templates: 'Email Templates';
    whatsapp_templates: 'Whatsapp Templates';
    business_data: 'Business Data';
    sites: 'Sites';
    manage_sites: 'Manage Sites';
    sites_list: 'Site List';
    list: 'List';
    add: 'Add';
    password: 'Password';
    email: 'Email';
    whatsapp: 'Whatsapp';
    business: 'Business';
    manage: 'Manage';
    view: 'View';
    appointments: 'Appointments';
    admin_template:"Admin template" 
  };

  clients: {
    manage: 'Manage Clients';
    client_list: 'Client List';
    new_client: 'New Client';
    new_client_description: 'Create a new client';
    client_created: 'Client created';
    client_updated: 'Client updated';
    update_client: 'Update Client';
    update_client_description: 'Update the client information';
    update: 'Update';
    create: 'Create';
    cancel: 'Cancel';
    client: 'Client';
    edit: 'Edit';
    delete: 'Delete';
    username: 'Username';
    name: 'Name';
    lastName: 'Last Name';
    email: 'Email';
    document: 'Document';
    phone: 'Phone';
    direction: 'Direction';
    countryId: 'Country';
    provinceId: 'Province';
    cantonId: 'Canton';
    parish: 'Parish';
    createdAt: 'Creation Date';
    updateAt: 'Update Date';
    actions: 'Actions';
    error_username: 'Username is required';
    error_name: 'Name is required';
    error_last_name: 'Last name is required';
    error_province: 'Province is required';
    error_canton: 'Canton is required';
    error_email: 'Email is required';
    error_document: 'Document is required';
    error_phone: 'Phone is required';
    error_direction: 'Direction is required';
    invalid_email: 'Invalid email';
    rows_per_page: 'Rows per page';
    show_rows: 'Show rows';
    page: 'Page';
    of: 'of';
    columns: 'Columns';
    country_name: 'Country Name';
    province_name: 'Province Name';
    canton_name: 'Canton Name';
    hide: 'Hide';
    columns: 'Columns';
    no_data: 'No data';
    select_country: 'Select a country';
    select_province: 'Select a province';
    select_canton: 'Select a canton';
    filter_by_username: 'Filter by username';
    filter_by_name: 'Filter by name';
    filter_by_lastName: 'Filter by last name';
    filter_by_email: 'Filter by email';
    filter_by_document: 'Filter by document';
    filter_by_canton: 'Filter by canton';
    filter_by_createdAt: 'Filter by created date';
    filter_by_updatedAt: 'Filter by updated date';
    delete_sure: 'Are you absolutely sure?';
    search_canton: 'Search canton...';
    no_canton: 'No canton found';
    delete_message: 'This action cannot be undone. This could permanently delete the client.';
    no_items_available: "no_items_available";
  };

  dashboardLayout: {
    description: 'A client page; to demonstrate client side i18n';
    title: 'Client page';
    keywords: 'client; page; i18n';
  };

  users: {
    filter_by_createdAt: 'Filter by createdAt';
    delete_sure: 'Are you absolutely sure?';
    delete_message: 'This action cannot be undone. This could permanently delete the client.';
    cancel: 'Cancel';
    delete: 'Delete';
    username: 'Username';
    email: 'Email';
    status: 'Status';
    document: 'Document';
    role: 'Role';
    phone: 'Phone';
    direction: 'Direction';
    createdAt: 'Creation Date';
    updateAt: 'Update Date';
    actions: 'Actions';
    user_created: 'user_created';
    new_user: 'New user';
    new_user_description: 'New user description';
    create: 'Create';
    password_reset_success: 'Password reset success';
    reset_password: 'Reset password';
    reset_password_description: 'Reset password description';
    new_password: 'New password';
    password_required: 'Password required';
    confirm_password: 'Confirm password';
    passwords_do_not_match: 'Passwords do not match';
    accept: 'Accept';
    manage: 'Manage users';
    user_updated: 'User updated';
    update_user: 'Update user';
    update_user_description: 'Update user description';
    error_username: 'Error username';
    invalid_email: 'Invalid email';
    error_email: 'Error email';
    error_role: 'Error role';
    select_country: 'Select country';
    select_province: 'Select province';
    select_canton: 'Select canton';
    select_parish: 'Select parish';
    countryId: 'Country Id';
    provinceId: 'Province Id';
    cantonId: 'Canton Id';
    parishId: 'Parish Id';
    error_password_min: 'Error password min';
    error_password: 'Error password';
    password: 'Password';
    filter_by_username: 'Filter by username';
    filter_by_role: 'Filter by role';
    filter_by_status: 'Filter by status';
    no_data: 'No data';
    update: 'Update';
    error_status: 'Status error';
    active: "Active";
    inactive: "Inactive";
    select_status: "Select status";
    select_role: "Select role";
    roles_super_admin: "Super Admin"
    roles_admin: "Admin";
    roles_assistant: "Assistant";
  };

  templates: {  
    templates: "Templates";
    admin_templates_email: "Admin templates email";
    manage_templates: "Manage templates",
    new_template: "New template",
    new_template_description: "Create a new template",
    template_created: "Template created successfully",
    template_updated: "Template updated successfully",
    delete_sure: "Are you sure you want to delete this template?",
    delete_message: "This action cannot be undone.",
    cancel: "Cancel",
    delete: "Delete",
    create: "Create",
    update: "Update",
    update_template: "Update template",
    update_template_description: "Modify the selected template",
    name: "Name",
    content: "Content",
    action: "Action",
    templateEnvIds: "Environment Variables",
    status: "Status",
    active: "Active",
    inactive: "Inactive",
    activate: "Activate",
    activate_true: "Activate",
    activate_false: "Deactivate",
    select_action: "Select action",
    select_template_envs: "Select environment variables",
    select_status: "Select status",
    filter_by_name: "Filter by name",
    filter_by_status: "Filter by status",
    filter_by_createdAt: "Filter by creation date",
    no_data: "No data",
    createdAt: "Creation date",
    error_name: "Name is required",
    error_content: "Content is required",
    error_status: "Status is required",
    error_activate: "Activate field is required",
    actions: "Actions",
    select_activate: "select activate"
    add_to_content: "add to content",
    select_base_template: "Select base template"
    error_template_env_ids: "error_template_env_ids"
    select_variable:"select_variable",
    error_missing_variables:"error_missing_variables",
    activated: "Activate",
    deactivated: "Desactive"
  };  
}
export default Resources;
