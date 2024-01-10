import { B as y } from './BlogAside-5a664b5c.js'
import { u as k, r as l, e as w, a as q } from './index-c99718b6.js'
import {
  _ as f,
  r as x,
  o,
  c as i,
  b as e,
  j as n,
  v as m,
  F as c,
  k as u,
  l as D,
  m as I,
  d as T,
  h,
  t as b,
  p as $,
  q as S,
  i as j,
} from './index-7ebd65cb.js'
const B =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/blog-details.jpg',
  R = 'https://jay04makwana.github.io/anshtechlabs.github.io/images/blog/4.jpg',
  A = 'https://jay04makwana.github.io/anshtechlabs.github.io/images/blog/5.jpg',
  L =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/blog-details/comment-img-1.jpg',
  C =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/blog-details/comment-img-2.jpg',
  J =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/blog-details/comment-img-3.jpg'
const M = {
    components: { BlogAside: y },
    setup: () => ({ v$: k() }),
    data() {
      return {
        replyData: { name: '', email: '', website: '', comment: '' },
        postData: [
          {
            postImage: 'popular-posts-1.png',
            postDate: 'April 20, 2022',
            postText: 'Drughydrus Add Google Drive To Roughrobin Torjan',
          },
          {
            postImage: 'popular-posts-2.png',
            postDate: 'Jun 21, 2022',
            postText:
              'DHS Issues Emergency Directive To Prevent Hacking Attack',
          },
          {
            postImage: 'popular-posts-3.png',
            postDate: 'Jun 22, 2022',
            postText: 'Security In A Fragment World Of Workload',
          },
          {
            postImage: 'popular-posts-4.png',
            postDate: 'Jun 23, 2022',
            postText: 'Secure Managed IT Cloud Security',
          },
        ],
        archiveData: [
          { month: 'January', year: '2022' },
          { month: 'February', year: '2022' },
          { month: 'March', year: '2022' },
          { month: 'April', year: '2022' },
          { month: 'May', year: '2022' },
          { month: 'June', year: '2022' },
        ],
        categoryData: [
          { name: 'Blockchain', amount: '10' },
          { name: 'Cyber Security', amount: '20' },
          { name: 'Cybercrime', amount: '10' },
          { name: 'Global news', amount: '12' },
          { name: 'RansomeWare', amount: '16' },
          { name: 'whitepapers', amount: '17' },
        ],
      }
    },
    validations() {
      return {
        replyData: {
          name: { required: l },
          email: { required: l, email: w },
          website: { required: l },
          comment: { required: l },
        },
      }
    },
    methods: {
      async submit() {
        const s = await this.v$.$validate()
        console.log(this.replyData),
          s &&
            q
              .post(
                'https://jsonplaceholder.typicode.com/posts',
                this.replyData
              )
              .then((t) => {
                alert('submitted'), console.log(t)
              })
              .catch((t) => {
                console.log(t)
              })
      },
    },
  },
  r = (s) => ($('data-v-9bd4f4e1'), (s = s()), S(), s),
  P = { class: 'py-24 dark:text-white' },
  N = { class: 'container mx-auto' },
  V = { class: 'grid grid-cols-12' },
  U = { class: 'col-span-12 lg:col-span-8 px-3' },
  E = h(
    '<div data-v-9bd4f4e1><div class="mb-2.5" data-v-9bd4f4e1><ul data-v-9bd4f4e1><li class="block md:inline-block max-md:pb-3 text-xred text-sm" data-v-9bd4f4e1><span class="text-xred font-semibold" data-v-9bd4f4e1>Posted On:</span> <a href="#" class="text-stone-500 text-[13px]" data-v-9bd4f4e1>May 19, 2022</a></li><div class="hidden md:inline-block mx-5 dark:text-xred" data-v-9bd4f4e1>-</div><li class="block md:inline-block text-xred text-sm" data-v-9bd4f4e1><span class="text-xred font-semibold" data-v-9bd4f4e1>Posted By:</span> <a href="#" class="text-stone-500 text-[13px]" data-v-9bd4f4e1>John Anderson</a></li></ul></div><h3 class="mb-8 mt-0 text-xpurple dark:text-white text-xl lg:text-3xl font-semibold" data-v-9bd4f4e1>DHS Issues Emergency Directive To Prevent Hacking Attack</h3><div class="mb-8" data-v-9bd4f4e1><img src="' +
      B +
      '" alt="image" data-v-9bd4f4e1></div><p class="text-md mb-[15px]" data-v-9bd4f4e1>Quuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quia non numquam eius modi tempora incidunt ut labore et dolore magnam dolor sit, consectetur qui ratione voluptatem sequi.</p><p data-v-9bd4f4e1>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat labore et dolore magna aliqua.</p><blockquote class="overflow-hidden bg-[#f7f7f7] dark:bg-xblack relative my-5 rounded p-12" data-v-9bd4f4e1><div class="absolute left-0 top-0 bottom-0 w-1 bg-xred my-5" data-v-9bd4f4e1></div><p class="font-semibold text-left md:text-lg italic leading-7" data-v-9bd4f4e1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus aliquid praesentium eveniet illum asperiores, quidem, ipsum voluptatum numquam ducimus nisi exercitationem dolorum facilis Repellendus aliquid praesentium eveniet illum asperiores.</p></blockquote><p class="text-md mb-[15px]" data-v-9bd4f4e1>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat consectetur adipisicing Lorem ipsum dolor sit amet numquam.</p><p class="text-md mb-[15px]" data-v-9bd4f4e1>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat ullamco laboris nisi ut aliquip ex ea.</p><h3 class="mb-8 mt-0 text-2xl font-semibold text-xpurple dark:text-white" data-v-9bd4f4e1>Related Post</h3><div class="grid grid-cols-12" data-v-9bd4f4e1><div class="col-span-12 sm:col-span-6 sm:pr-3" data-v-9bd4f4e1><div class="relative mb-0" data-v-9bd4f4e1><a href="#" data-v-9bd4f4e1><img class="mb-2.5" src="' +
      R +
      '" alt="Image" data-v-9bd4f4e1><span class="absolute left-0 top-0 bg-white py-2.5 px-6 text-xred hover:text-black text-sm" data-v-9bd4f4e1> 08 <br data-v-9bd4f4e1> jun </span><h3 class="text-xl font-semibold font-barlow leading-6 text-xpurple dark:text-white" data-v-9bd4f4e1>DHS issues emergency directive to prevent hacking attack</h3></a><p class="mb-3 mt-2.5 text-md" data-v-9bd4f4e1>Lorem ipsum, dolor sit amet consectetur sit adipisicing Consectetur nisi pariatur quos.</p><a href="#" class="text-xred" data-v-9bd4f4e1>Read More</a></div></div><div class="col-span-12 sm:col-span-6 sm:pl-3 max-sm:mt-5" data-v-9bd4f4e1><div class="relative mb-0" data-v-9bd4f4e1><a href="#" data-v-9bd4f4e1><img class="mb-2.5" src="' +
      A +
      '" alt="Image" data-v-9bd4f4e1><span class="absolute left-0 top-0 bg-white py-2.5 px-6 text-xred hover:text-black text-sm" data-v-9bd4f4e1> 09 <br data-v-9bd4f4e1> jun </span><h3 class="text-xl font-semibold font-barlow leading-6 text-xpurple dark:text-white" data-v-9bd4f4e1>Drughydrus Add Google Drive To Roughrobin Torjan</h3></a><p class="mb-3 mt-2.5 text-md" data-v-9bd4f4e1>Lorem ipsum, dolor sit amet consectetur sit adipisicing Consectetur nisi pariatur quos.</p><a href="#" class="text-xred animate_animated hover:animate_rubberBand" data-v-9bd4f4e1>Read More</a></div></div></div></div><div class="flex items-center mt-5" data-v-9bd4f4e1><div class="basis-1/2 flex items-center" data-v-9bd4f4e1><span class="text-center flex items-center mr-5" data-v-9bd4f4e1><i class="pi pi-share-alt text-xred text-lg" data-v-9bd4f4e1></i></span><a class="font-semibold text-stone-500 hover:text-xred" href="#" data-v-9bd4f4e1>Share</a></div><div class="basis-1/2 flex justify-end" data-v-9bd4f4e1><ul class="rubberBandAnimate flex gap-1 [&amp;_li_a]:bg-xred [&amp;_li]:text-white [&amp;_li_a]:rounded-full [&amp;_li_a_i]:text-sm [&amp;_li_a]:text-center [&amp;_li_a]:block [&amp;_li_a]:h-8 [&amp;_li_a]:w-8 [&amp;_li_a]:leading-8" data-v-9bd4f4e1><li data-v-9bd4f4e1><a class="hover:animate_animated hover:animate__rubberBand" href="#" target="_blank" data-v-9bd4f4e1><i class="pi pi-info" data-v-9bd4f4e1></i></a></li><li data-v-9bd4f4e1><a href="#" target="_blank" data-v-9bd4f4e1><i class="pi pi-twitter" data-v-9bd4f4e1></i></a></li><li data-v-9bd4f4e1><a href="#" target="_blank" data-v-9bd4f4e1><i class="pi pi-google" data-v-9bd4f4e1></i></a></li><li data-v-9bd4f4e1><a href="#" target="_blank" data-v-9bd4f4e1><i class="pi pi-apple" data-v-9bd4f4e1></i></a></li></ul></div></div><div class="flex items-center mt-8 py-5 border-y border-solid border-gray-200 text-sm" data-v-9bd4f4e1><div class="basis-1/2 flex items-center" data-v-9bd4f4e1><a class="font-semibold hover:text-xred text-xpurple dark:text-white" href="#" data-v-9bd4f4e1><i class="pi pi-arrow-left mr-3" data-v-9bd4f4e1></i> Prev Post </a></div><div class="basis-1/2 flex justify-end" data-v-9bd4f4e1><a class="font-semibold hover:text-xred text-xpurple dark:text-white" href="#" data-v-9bd4f4e1> Next Post <i class="pi pi-arrow-right ml-3" data-v-9bd4f4e1></i></a></div></div>',
    3
  ),
  F = { class: 'mt-8' },
  H = h(
    '<h3 class="mb-8 text-xl md:text-2xl font-bold text-xpurple dark:text-white" data-v-9bd4f4e1>3 Comments:</h3><ol data-v-9bd4f4e1><li data-v-9bd4f4e1><div class="border-b border-solid border-gray-200 md:pl-16 text-sm mb-5 pb-5" data-v-9bd4f4e1><footer class="mb-2" data-v-9bd4f4e1><div class="text-base relative text-xpurple dark:text-white mb-1" data-v-9bd4f4e1><img class="md:absolute h-12 w-12 rounded-full -left-16" src="' +
      L +
      '" alt="image" data-v-9bd4f4e1><b data-v-9bd4f4e1>Jimy Pearson</b></div><div data-v-9bd4f4e1><a href="#" data-v-9bd4f4e1><span data-v-9bd4f4e1>Jun 24, 2022 at 10:59 am</span></a></div></footer><div data-v-9bd4f4e1><p data-v-9bd4f4e1>Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type.</p></div><div class="mt-4" data-v-9bd4f4e1><a href="#" class="inline-block rounded-full border border-solid border-[#ded9d9] py-1.5 px-5 hover:bg-xred hover:text-white font-medium hover:border-xred duration-500" data-v-9bd4f4e1>Reply</a></div></div><ol class="md:ml-10" data-v-9bd4f4e1><li data-v-9bd4f4e1><div class="border-b border-solid border-gray-200 md:pl-16 text-sm mb-5 pb-5" data-v-9bd4f4e1><footer class="mb-2" data-v-9bd4f4e1><div class="text-base text-xpurple dark:text-white relative mb-1" data-v-9bd4f4e1><img class="md:absolute h-12 w-12 rounded-full -left-16" src="' +
      C +
      '" alt="image" data-v-9bd4f4e1><b data-v-9bd4f4e1>Karl Mekar</b></div><div data-v-9bd4f4e1><a href="#" data-v-9bd4f4e1><span data-v-9bd4f4e1>Jun 24, 2022 at 10:59 am</span></a></div></footer><div data-v-9bd4f4e1><p data-v-9bd4f4e1>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim</p></div><div class="mt-4" data-v-9bd4f4e1><a href="#" class="inline-block rounded-full border border-solid border-[#ded9d9] py-1.5 px-5 hover:bg-xred hover:text-white font-medium hover:border-xred duration-500" data-v-9bd4f4e1>Reply</a></div></div></li></ol></li><li data-v-9bd4f4e1><div class="md:pl-16 text-sm mb-5 pb-5" data-v-9bd4f4e1><footer class="mb-2" data-v-9bd4f4e1><div class="text-base relative text-xpurple dark:text-white mb-1" data-v-9bd4f4e1><img class="md:absolute h-12 w-12 rounded-full -left-16" src="' +
      J +
      '" alt="image" data-v-9bd4f4e1><b class="fn" data-v-9bd4f4e1>Tesa Jack</b></div><div data-v-9bd4f4e1><a href="#" data-v-9bd4f4e1><span data-v-9bd4f4e1>Jun 24, 2022 at 10:59 am</span></a></div></footer><div data-v-9bd4f4e1><p data-v-9bd4f4e1>Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type.</p></div><div class="mt-4" data-v-9bd4f4e1><a href="#" class="inline-block rounded-full border border-solid border-[#ded9d9] py-1.5 px-5 hover:bg-xred hover:text-white font-medium hover:border-xred duration-500" data-v-9bd4f4e1>Reply</a></div></div></li></ol>',
    2
  ),
  W = { class: 'w-full p-8 shadow-lg' },
  O = r(() =>
    e(
      'div',
      { class: 'mx-3' },
      [
        e(
          'h3',
          {
            class:
              'font-barlow text-xl font-semibold mb-4 text-xpurple dark:text-white',
          },
          'Leave A Reply'
        ),
        e('p', { class: 'mb-4' }, [
          e(
            'span',
            { class: 'max-lg:text-sm' },
            'Your email address will not be published. Required fields are marked *'
          ),
        ]),
      ],
      -1
    )
  ),
  z = { class: 'grid grid-cols-12' },
  G = { class: 'col-span-12 md:col-span-6 mx-3' },
  K = { class: 'mb-8' },
  Q = r(() => e('label', { class: 'block mb-1 font-medium' }, 'Name *', -1)),
  Y = { class: 'col-span-12 md:col-span-6 px-3' },
  X = { class: 'mb-8' },
  Z = r(() => e('label', { class: 'block mb-1 font-medium' }, 'Email *', -1)),
  ee = { class: 'col-span-12 px-3' },
  ae = { class: 'mb-8' },
  te = r(() => e('label', { class: 'block mb-1 font-medium' }, 'Website', -1)),
  de = { class: 'col-span-12 px-3' },
  se = { class: 'mb-8' },
  oe = r(() => e('label', { class: 'block mb-1 font-medium' }, 'Comment', -1)),
  ie = { class: 'col-span-12' },
  re = { class: 'mx-3' },
  le = r(() =>
    e(
      'div',
      {
        class:
          'absolute top-0 left-0 w-0 h-full -z-10 bg-black group-hover:left-auto group-hover:right-0 group-hover:w-1/2 duration-500 dark:hidden',
      },
      null,
      -1
    )
  ),
  ne = r(() =>
    e(
      'div',
      {
        class:
          'absolute top-0 right-0 w-0 h-full -z-10 bg-black group-hover:left-0 group-hover:right-auto group-hover:w-1/2 duration-500 dark:hidden',
      },
      null,
      -1
    )
  ),
  me = { class: 'col-span-12 lg:col-span-4 px-3' }
function ce(s, t, g, _, d, p) {
  const v = x('blog-aside')
  return (
    o(),
    i('section', P, [
      e('div', N, [
        e('div', V, [
          e('div', U, [
            E,
            e('div', F, [
              H,
              e('form', W, [
                O,
                e('div', z, [
                  e('div', G, [
                    e('div', K, [
                      Q,
                      n(
                        e(
                          'input',
                          {
                            class:
                              'h-12 w-full bg-[#f7f7f7] dark:bg-xblack py-2.5 px-5 border border-solid border-[#e8e8e8] dark:border-neutral-500 focus:outline-none focus:border-xred focus:bg-white dark:focus:bg-xblack placeholder:text-[#6c757d] placeholder:opacity-100',
                            type: 'text',
                            name: 'name',
                            id: 'name',
                            'onUpdate:modelValue':
                              t[0] || (t[0] = (a) => (d.replyData.name = a)),
                          },
                          null,
                          512
                        ),
                        [[m, d.replyData.name]]
                      ),
                      (o(!0),
                      i(
                        c,
                        null,
                        u(
                          s.v$.replyData.name.$errors,
                          (a) => (
                            o(),
                            i(
                              'span',
                              { class: 'text-red-500', key: a.$uid },
                              b(a.$message),
                              1
                            )
                          )
                        ),
                        128
                      )),
                    ]),
                  ]),
                  e('div', Y, [
                    e('div', X, [
                      Z,
                      n(
                        e(
                          'input',
                          {
                            class:
                              'h-12 w-full bg-[#f7f7f7] dark:bg-xblack py-2.5 px-5 border border-solid border-[#e8e8e8] dark:border-neutral-500 focus:outline-none focus:border-xred focus:bg-white dark:focus:bg-xblack placeholder:text-[#6c757d] placeholder:opacity-100',
                            type: 'email',
                            name: 'email',
                            id: 'email',
                            required: '',
                            'onUpdate:modelValue':
                              t[1] || (t[1] = (a) => (d.replyData.email = a)),
                          },
                          null,
                          512
                        ),
                        [[m, d.replyData.email]]
                      ),
                      (o(!0),
                      i(
                        c,
                        null,
                        u(
                          s.v$.replyData.email.$errors,
                          (a) => (
                            o(),
                            i(
                              'span',
                              { class: 'text-red-500', key: a.$uid },
                              b(a.$message),
                              1
                            )
                          )
                        ),
                        128
                      )),
                    ]),
                  ]),
                  e('div', ee, [
                    e('div', ae, [
                      te,
                      n(
                        e(
                          'input',
                          {
                            class:
                              'h-12 w-full bg-[#f7f7f7] dark:bg-xblack py-2.5 px-5 border border-solid border-[#e8e8e8] dark:border-neutral-500 focus:outline-none focus:border-xred focus:bg-white dark:focus:bg-xblack placeholder:text-[#6c757d] placeholder:opacity-100',
                            type: 'text',
                            name: 'website',
                            id: 'website',
                            required: '',
                            'onUpdate:modelValue':
                              t[2] || (t[2] = (a) => (d.replyData.website = a)),
                          },
                          null,
                          512
                        ),
                        [[m, d.replyData.website]]
                      ),
                      (o(!0),
                      i(
                        c,
                        null,
                        u(
                          s.v$.replyData.website.$errors,
                          (a) => (
                            o(),
                            i(
                              'span',
                              { class: 'text-red-500', key: a.$uid },
                              b(a.$message),
                              1
                            )
                          )
                        ),
                        128
                      )),
                    ]),
                  ]),
                  e('div', de, [
                    e('div', se, [
                      oe,
                      n(
                        e(
                          'textarea',
                          {
                            class:
                              'h-auto w-full bg-[#f7f7f7] dark:bg-xblack py-2.5 px-5 border border-solid border-[#e8e8e8] dark:border-neutral-500 focus:outline-none focus:border-xred focus:bg-white dark:focus:bg-xblack placeholder:text-[#6c757d] placeholder:opacity-100',
                            name: 'comment',
                            id: 'comment',
                            cols: '30',
                            rows: '8',
                            required: '',
                            'onUpdate:modelValue':
                              t[3] || (t[3] = (a) => (d.replyData.comment = a)),
                            'data-error': 'Write your message',
                          },
                          null,
                          512
                        ),
                        [[m, d.replyData.comment]]
                      ),
                      (o(!0),
                      i(
                        c,
                        null,
                        u(
                          s.v$.replyData.comment.$errors,
                          (a) => (
                            o(),
                            i(
                              'span',
                              { class: 'text-red-500', key: a.$uid },
                              b(a.$message),
                              1
                            )
                          )
                        ),
                        128
                      )),
                    ]),
                  ]),
                  e('div', ie, [
                    e('div', re, [
                      e(
                        'button',
                        {
                          type: 'submit',
                          class:
                            'max-md:w-full table cursor-pointer bg-xred border dark:border-neutral-500 dark:bg-xblack z-10 text-white relative text-center overflow-hidden py-3.5 px-8 dark:hover:bg-[#0e0129] dark:focus:bg-xred duration-500 group',
                          onClick:
                            t[4] ||
                            (t[4] = D(
                              (...a) => p.submit && p.submit(...a),
                              ['prevent']
                            )),
                        },
                        [le, ne, I(' POST A COMMENT ')]
                      ),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
          e('div', me, [
            T(
              v,
              {
                postData: d.postData,
                archives: d.archiveData,
                category: d.categoryData,
                meta: 'true',
              },
              null,
              8,
              ['postData', 'archives', 'category']
            ),
          ]),
        ]),
      ]),
    ])
  )
}
const ue = f(M, [
    ['render', ce],
    ['__scopeId', 'data-v-9bd4f4e1'],
  ]),
  be = { components: { BlogDetails: ue } }
function pe(s, t, g, _, d, p) {
  const v = x('blog-details')
  return o(), j(v)
}
const he = f(be, [['render', pe]])
export { he as default }
