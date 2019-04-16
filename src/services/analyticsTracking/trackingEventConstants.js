export const TRACKING_EVENTS = {
  categories: {
    join: 'Join',
    signIn: 'Sign In',
    modals: 'Modals',
    charts: {
      donut: {
        _donut: 'Chart: Donut',
        userInterests: 'Chart: Donut: User Interests',
      },
      bar: {
        _bar: 'Chart: Bar:',
        studies: 'Chart: Bar: Studies',
        diagnoses: 'Chart: Bar: Most Frequent Diagnoses',
      },
    },
    user: {
      profile: 'User Profile',
      dashboard: {
        widgets: {
          authorizedStudies: 'Autohorized Studies',
          savedQueries: 'User Dashboard: Saved Queries widget',
          _card: 'User Dashboard: Card',
          _multiCard: 'User Dashboard: MultiCard',
        },
      },
    },
    entityPage: {
      file: 'Entity Page: File',
      participant: 'Entity Page: Participant',
    },
    cohortBuilder: {
      _cohortBuilder: "Cohort Builder",
      filters:{
        _cohortBuilderFilters: "Cohort Builder: Filters",
        quickFilters: "Cohort Builder: Filters - Quick",
        studyFilters: "Cohort Builder: Filters - Study",
        demographicFilters: "Cohort Builder: Filters - Demographic",
        clinicalFilters: "Cohort Builder: Filters - Clinical",
        biospecimensFilters: "Cohort Builder: Filters - Biospecimens",
        availableDataFilters: "Cohort Builder: Filters - Available Data",
      } 
    },
    fileRepo: {
      filters: 'File Repo: Filters',
      dataTable: 'File Repo: Data Table',
      actionsSidebar: 'File Repo: Actions Sidebar',
    },
    integration: {
      cavatica: 'Integration: Cavatica',
    },
  },
  actions: {
    acceptedTerms: 'Accepted Terms',
    signedUp: 'Join Completed!',
    completedProfile: 'Completed Profile',
    open: 'Open',
    close: 'Close',
    hover: 'Hover',
    click: 'Clicked',
    edit: 'Edit',
    scroll: 'Scrolled',
    save: 'Save',
    filter: 'Filter',
    copy: {
      toCavatica: 'Copied Files to Cavatica Project',
    },
    download: {
      manifest: 'Download Manifest',
      report: 'Download Report',
    },
    query: {
      save: 'Query Saved',
      share: 'Query Shared',
      clear: 'Clear Query (sqon)',
      delete: 'Query Deleted ',
    },
    userRoleSelected: 'User Role Updated',
    integration: {
      init: 'Integration Connection INIT',
      connected: 'Integration Connection SUCCESS',
      failed: 'Integration Connection FAILED',
    },
  },
  labels: {
    joinProcess: 'Join Process',
    gen3: 'Gen3',
    cavatica: 'Cavatica',
  },
  timings: {
    modal: 'MODAL__',
    queryToDownload: 'FILE_QUERY_TO_DOWNLOAD',
    queryToCavatica: 'FILE_QUERY_TO_CAVATICA_COPY',
  },
};
