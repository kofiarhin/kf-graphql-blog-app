let users = [
  {
    id: "1",
    name: "kofi arhin",
    email: "kofiarhin@gmail.com",
    password: "password",
  },
  {
    id: "2",
    name: "lebron james",
    email: "lebron@gmail.com",
    password: "password",
  },
  {
    id: "3",
    name: "kyrie irving",
    email: "kyrie@gmail.com",
    password: "password",
  },
  {
    id: "4",
    name: "gilbert arena",
    email: "gilbert@gmail.com",
    password: "password",
  },
];

let posts = [
  {
    id: "1",
    user_id: "1",
    title:
      ". Lorem Ipsum has been the industry's standard dummy text ever since the ",
    body: "r 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  },
  {
    id: "2",
    user_id: "1",
    title: " passages, and more recently with desktop",
    body: " essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageM",
  },
  {
    id: "3",
    user_id: "1",
    title:
      "Donate: If you use this site regularly and would like to help keep the site on the",
    body: "ar belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered",
  },
  {
    id: "4",
    user_id: "1",
    title:
      "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't an",
    body: "erspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat",
  },
];

const db = {
  users,
  posts,
};

export default db;
