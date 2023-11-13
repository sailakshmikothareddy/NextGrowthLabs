const display_structure = document.querySelector('.display_structure');
const message = document.querySelector('.message');


const json_data = {
  Evaluation: {
    Documents: {
      'Document1.jpg': null,
      'Document2.jpg': null,
      'Document3.jpg': null,
      texts: {
        'Document2.jpg': null,
        'Document3.jpg': null,
        'Document.jpg': null,
      }
    },
    Desktop: {
      'Screenshot1.jpg': null,
      'videopal.mp4': null,
      'song.mp3': null,
    },
    Downloads: {
      Drivers: {
        'Printerdriver.dmg': null,
        'cameradriver.dmg': null,
        'scanerdriver.dmg': null,
      },
      Applications: {
        'Webstorm.dmg': null,
        'Pycharm.dmg': null,
        'FileZila.dmg': null,
        // 'Mattermost.dmg': null,
      },
      'chromedriver.dmg': null,
    },
  },
};


function folder_stucture(json_data, parent) {
  const main_container = document.createElement('ul');

  // to show all folders and sub folders
  for (const key in json_data) {

    const container = document.createElement('li');
    const folders = document.createElement('span');
    var icon = `<i class="fa-solid fa-chevron-right"></i>` + '  ';
    var delete_btn = document.querySelector('.delete')
    folders.innerHTML = icon + key;
    folders.classList.add('folder');

    //initialize action buttons
    const add_file = document.querySelector('.add_file')
    const add_btn = document.querySelector('.add_btn')
    const add_folder = document.querySelector('.add_folder')

    //when user click the folder the sub folders will be shows or hide
    folders.addEventListener('click', () => {

      const folder = container.querySelector('ul');
      const icon_down = '<i class="fas fa-angle-down"></i>' + '  '
      const all_span_tag = folder.querySelectorAll('span')

      if (!folders.innerHTML.includes(".")) {

        //hide and show folder
        folder.classList.toggle('hidden');

        all_span_tag.forEach((ele, i) => {

          if (!ele.innerText.includes(".")) {

            ele.addEventListener('click', () => {

              //delete folder and file



              //add folder to parent folder
              all_span_tag.forEach((fbtn, i) => {
                fbtn.classList.remove("selected");

              })
              //when we click any folder that folder select for insert or delte the folder 
              ele.classList.add("selected");
              const new_filename_input = document.querySelector('.new_filename')

              //delete folder
              const trash_btn = document.querySelector('.delete')
              if (ele.classList.contains('selected')) {
                trash_btn.style.visibility = 'visible';
                trash_btn.addEventListener('click', () => {
                  trash_btn.style.visibility = 'hidden';

                  document.querySelector('.selected').parentNode.style.display = 'none'
                })

              }

              // add folder to folder section
              add_folder.addEventListener('click', () => {

                const new_foldername = document.querySelector('.new')
                const new_foldername_input = document.querySelector('.new_foldername')
                new_filename_input.value = ''
                new_foldername.style.display = 'block'

                add_btn.addEventListener('click', (e) => {

                  if (!new_filename_input.value.includes('.')) {

                    const selected = document.querySelector('.selected').innerText.replace(/\s/g, '');
                    message.innerHTML = (`${new_filename_input.value} file added to ${selected} folder`)
                    json_data.Evaluation[selected][new_filename_input.value] = { rudresh: 'web developer' };
                    new_foldername.style.display = 'none'
                    console.log(json_data);
                    return json_data

                  } else {
                    message.innerHTML = ('something error')
                  }
                })
              })
              // add file to folder section
              add_file.addEventListener('click', () => {

                const new_filename = document.querySelector('.new')
                new_filename_input.value = ''
                new_filename.style.display = 'block'

                add_btn.addEventListener('click', (e) => {

                  if (new_filename_input.value.includes('.')) {

                    const selected = document.querySelector('.selected').innerText.replace(/\s/g, '');
                    message.innerHTML = (`${new_filename_input.value} file added to ${selected} folder`)
                    json_data.Evaluation[selected][new_filename_input.value] = null;
                    new_filename.style.display = 'none'
                    const updated_json_data = json_data
                    return (updated_json_data)

                  } else {
                    message.innerHTML = ('Add name with  extention example .js .jpg')
                  }
                })
              })
            })
          }

        })
      }

      // select all span tags 
      all_span_tag.forEach((ele, i) => {
        let filename = ele.innerHTML;

        if (filename.includes(".") && filename.includes(icon)) {
          var text_icon = `<i class="fa-solid fa-align-right"></i>` + '  ';
          var trash = ' ' + `<i class="fa-solid  fa-trash trash "></i>`;
          ele.innerHTML = text_icon + ele.innerText + trash
          const delete_file = document.querySelectorAll('.trash')


          ele.addEventListener('click', () => {
            ele.parentNode.style.height = '1rem'
            ele.parentNode.classList.toggle('active');

            // delete file 
            delete_file.forEach(dlt => {
              dlt.style.visibility = 'visible';
              dlt.addEventListener('click', () => {
                dlt.style.visibility = 'hidden';

                ele.parentNode.style.display = 'none'
              })
            })



            // }

          })
        } else if (folders.innerHTML.includes(icon_down)) {
          folders.innerHTML = icon + key;
        } else {
          folders.innerHTML = icon_down + key;
        }
      })
      
    });

    //to add folders to container
    container.appendChild(folders);
    const sub_folders = document.createElement('ul');
    sub_folders.classList.add('hidden');
    folder_stucture(json_data[key], sub_folders);
    container.appendChild(sub_folders);
    main_container.appendChild(container);  

}
  parent.appendChild(main_container);
return json_data

}
folder_stucture(json_data, display_structure);
