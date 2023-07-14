<script>
  import JSZip from 'jszip';
  import { v4 as uuidv4 } from 'uuid';

  import { db } from './store';

  let db$;
	let files;

  const handleImport = async (f) => {
    db$ = await db();

    JSZip.loadAsync(f.target.files[0])
      .then((zip) => {
        zip.forEach(async (relativePath, file) => {
          if (relativePath.startsWith('__MACOSX')) { return };

          console.log('file @@@@@@@@@@@@@ ', file);

          const date = file.date.getTime();

          file.async('string')
            .then(async (body) => {
              console.log('body @@@@@@@@@@@@@ ', body);
              await db$.notes.insert({
                guid: uuidv4(),
                name: file.name.split('/').pop().replace(/\.[^/.]+$/, ''),
                body,
                createdAt: date,
                updatedAt: date
              });
          }, (e) => {
            console.log('file.async error @@@@@@@@@@', e);
          });
        });
      }, (e) => {
        console.log('loadAsync error, ', e)
      });
  };
</script>

<div>
  <label for="file-upload">
    [U]
  </label>
  <input id="file-upload" type="file" bind:files on:change={handleImport} />
</div>

<style>
  div {
    position: absolute;
    right: 28px;
    top: 5px;
  }
  input {
    display: none;
  }
  label {
    display: inline-block;
    width: 12px;
    height: 12px;
    color: #535353;
  }
</style>
