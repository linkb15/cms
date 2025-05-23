import { defineConfig, fields } from '@linkbcms/core';

export default defineConfig({
  ui: {
    logo: () => <img src="/logo.png" alt="logo" width={32} height={32} />,
  },

  collections: {
    custom: fields.customCollection({
      // Component: createSafeComponent(BrokenImage),
      label: 'Custom',
      Component: () => <div className="p-10">test</div>,
    }),

    blogs: fields.collection({
      label: 'Blogs',
      fieldSlug: 'title',
      i18n: {
        locales: ['en', 'id'],
        defaultLocale: 'en',
      },

      canCreate: false,
      canDelete: false,
      canUpdate: false,
      canRead: false,

      schema: {
        title: fields.text({
          label: 'Title',
          multiline: true,
          i18n: {
            id: 'Judul',
          },
          validation: {
            required: true,
          },
        }),
        order: fields.number({
          label: 'Order',
          validation: {
            required: true,
          },
        }),
        status: fields.select({
          label: 'Status',
          validation: {
            required: true,
          },
          options: [
            { value: 'draft', label: 'Draft' },
            { value: 'published', label: 'Published' },
            { value: 'archived', label: 'Archived' },
          ],
        }),

        slug: fields.text({ name: 'slug', label: 'Slug' }),
        // description: fields.text({ name: 'description', label: 'Description' }),
        content: fields.text({ name: 'content', label: 'Content' }),
        image: fields.image({ name: 'image', label: 'Image' }),
        date: fields.text({ name: 'date', label: 'Date', hidden: true }),
        custom: fields.custom({
          Component: () => <div>Custom</div>,
        }),
        author: fields.array(
          fields.reference({
            name: 'author',
            label: 'Author',
            collection: 'authors',
          }),
        ),
      },
    }),

    authors: fields.collection({
      label: 'Authors',
      schema: {
        name: fields.text({ name: 'name', label: 'Name' }),
      },
      fieldSlug: 'name',
    }),

    settings: fields.singleton({
      label: 'Settings',
      schema: {
        title: fields.text({ name: 'title', label: 'Title' }),
        navigation: fields.group({
          schema: {
            title: fields.text({ name: 'title', label: 'Title' }),
            slug: fields.text({ name: 'slug', label: 'Slug' }),
          },
        }),
        description: fields.text({ name: 'description', label: 'Description' }),
        number: fields.number({ name: 'number', label: 'Number' }),
        select: fields.select({
          name: 'select',
          label: 'Select',
          options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
          ],
        }),
      },
    }),

    settings2: fields.singleton({
      label: 'Settings 2',
      schema: {
        title: fields.text({ name: 'title', label: 'Title' }),
        navigation: fields.group({
          schema: {
            title: fields.text({ name: 'title', label: 'Title' }),
            slug: fields.text({ name: 'slug', label: 'Slug' }),
          },
        }),
        description: fields.text({ name: 'description', label: 'Description' }),
      },
    }),
  },

  db: {
    provider: 'supabase',
    timezone: 'Asia/Jakarta',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
  },

  // hook: {
  //   onInit: async ({ config, req }) => {
  //     console.log('onInit', config, req);
  //     if (config.collections.blogs) {
  //     }
  //   },
  //   onUpdate: async ({ config }) => {
  //     console.log('onUpdate', config);
  //   },
  //   onDelete: async ({ config }) => {
  //     console.log('onDelete', config);
  //   },
  // },

  auth: {
    providers: [
      {
        provider: 'local',
      },
      {
        provider: 'google',
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      {
        provider: 'github',
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      },
    ],
  },

  baseUrl: '/cms',

  cors: '*',

  plugins: [
    (config) => {
      if (config.auth.providers.length === 0) {
        config.auth.providers.push({
          provider: 'local',
        });
      }
    },
  ],
});
