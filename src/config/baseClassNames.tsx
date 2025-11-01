const BASE_CLASSNAMES: Record<string, Record<string, string>> = {
  avatar: {
    root: "govbr-avatar",
  },
  persona: {
    root: "govbr-persona",
    avatar: "govbr-persona-avatar",
    info: "govbr-persona-info",
    action: "govbr-persona-action",
  },
  rating: {
    root: "govbr-rating",
    stars: "govbr-rating-stars",
    value: "govbr-rating-value",
  },
  searchBox: {
    root: "govbr-searchbox",
    panel: "govbr-searchbox-panel",
    option: "govbr-searchbox-option",
    icon: "govbr-searchbox-icon",
  },
  tree: {
    root: "govbr-tree",
    item: "govbr-tree-item",
    toggle: "govbr-tree-toggle",
    icon: "govbr-tree-icon",
    group: "govbr-tree-group",
  },
  avatarGroup: {
    root: "govbr-avatar-group",
    item: "govbr-avatar-group-item",
    stacked: "govbr-avatar-group-stacked",
    overflow: "govbr-avatar-group-overflow",
  },
  iucnCategory: {
    root: "govbr-iucn-category",
    wrapper: "govbr-iucn-category-wrapper",
    label: "govbr-iucn-category-label",
  },
  button: {
    root: "govbr-button",
  },
  buttonGroup: {
    root: "govbr-button-group",
  },
  copyAction: {
    root: "govbr-copy-action",
    trigger: "govbr-copy-action-trigger",
  },
  spinner: {
    root: "govbr-spinner",
  },
  govbrLogo: {
    root: "govbr-logo",
  },
  govLogo: {
    root: "gov-logo",
  },
  header: {
    root: "govbr-header",
  },
  tooltip: {
    root: "govbr-tooltip",
    content: "govbr-tooltip-content",
  },
  message: {
    root: "govbr-message",
    danger: "govbr-message-danger",
    success: "govbr-message-success",
    warning: "govbr-message-warning",
    info: "govbr-message-info",
  },
  toaster: {
    root: "govbr-toaster",
    toast: "govbr-toaster-item",
  },
  flyout: {
    root: "govbr-flyout",
    toggle: "govbr-flyout-toggle",
    content: "govbr-flyout-content",
  },
  accordion: {
    root: "govbr-accordion",
    item: "govbr-accordion-item",
    trigger: "govbr-accordion-item-trigger",
    content: "govbr-accordion-item-content",
  },
  badge: {
    root: "govbr-badge",
    pulse: "govbr-badge-pulse",
  },
  card: {
    root: "govbr-card",
    header: "govbr-card-header",
    main: "govbr-card-main",
    footer: "govbr-card-footer",
    disabled: "govbr-card-disabled-overlay",
  },
  input: {
    root: "govbr-input",
    control: "govbr-input-control",
  },
  otpInput: {
    root: "govbr-otp-input",
    slot: "govbr-otp-input-slot",
    separator: "govbr-otp-input-separator",
  },
  radio: {
    root: "govbr-input-radio",
    label: "govbr-input-radio-label",
  },
  checkbox: {
    root: "govbr-input-checkbox",
    label: "govbr-input-checkbox-label",
  },
  status: {
    root: "govbr-badge-status",
    pulse: "govbr-badge-status-pulse",
  },
  tabs: {
    root: "govbr-tabs",
    tab: "govbr-tab",
    button: "govbr-tab-button",
    content: "govbr-tab-content",
  },
  table: {
    root: "govbr-table",
    head: "govbr-table-head",
    headerRow: "govbr-table-header-row",
    headerCell: "govbr-table-header-cell",
    body: "govbr-table-body",
    row: "govbr-table-row",
    cell: "govbr-table-cell",
  },
  dialog: {
    root: "govbr-dialog",
    content: "govbr-dialog-content",
  },
  dropdownMenu: {
    root: "govbr-dropdown-menu",
    trigger: "govbr-dropdown-menu-trigger",
    content: "govbr-dropdown-menu-content",
    item: "govbr-dropdown-menu-item",
    checkboxItem: "govbr-dropdown-menu-checkbox-item",
    radioItem: "govbr-dropdown-menu-radio-item",
    label: "govbr-dropdown-menu-label",
    separator: "govbr-dropdown-menu-separator",
    shortcut: "govbr-dropdown-menu-shortcut",
    subTrigger: "govbr-dropdown-menu-sub-trigger",
    subContent: "govbr-dropdown-menu-sub-content",
  },
  featuredTitle: {
    root: "govbr-featured-title",
  },
  breadcrumb: {
    root: "govbr-breadcrumb",
  },
  list: {
    root: "govbr-list",
    item: "govbr-list-item",
    label: "govbr-list-item-label",
    locator: "govbr-list-item-locator",
  },
  switch: {
    root: "govbr-switch",
    label: "govbr-switch-label",
  },
  carousel: {
    root: "govbr-carousel",
    holder: "govbr-carousel-holder",
    item: "govbr-carousel-item",
  },
  carouselSlider: {
    root: "govbr-carousel-slider",
    viewport: "govbr-carousel-slider-viewport",
    slide: "govbr-carousel-slider-slide",
    dots: "govbr-carousel-slider-dots",
  },
  groupOptions: {
    root: "govbr-group-options",
    list: "govbr-group-options-list",
    footer: "govbr-group-options-footer",
  },
  item: {
    root: "govbr-item",
    icon: "govbr-item-icon",
    content: "govbr-item-content",
    meta: "govbr-item-meta",
    actions: "govbr-item-actions",
  },
  calendar: {
    root: "govbr-calendar",
    header: "govbr-calendar-header",
    grid: "govbr-calendar-grid",
    day: "govbr-calendar-day",
  },
  multiComboBox: {
    root: "govbr-multiComboBox",
  },
  sheet: {
    root: "govbr-sheet",
    container: "govbr-sheet-container",
    panel: "govbr-sheet-panel",
    header: "govbr-sheet-header",
    main: "govbr-sheet-main",
    footer: "govbr-sheet-footer",
    close: "govbr-sheet-close-button",
  },
  step: {
    root: "govbr-step",
    item: "govbr-step-item",
    indicator: "govbr-step-indicator",
    connectorHorizontal: "govbr-step-connector-horizontal",
    connectorVertical: "govbr-step-connector-vertical",
    content: "govbr-step-content",
    label: "govbr-step-label",
    description: "govbr-step-description",
  },
};

export default BASE_CLASSNAMES;
