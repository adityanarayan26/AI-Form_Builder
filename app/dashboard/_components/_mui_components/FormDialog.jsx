"use client"

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/joy/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Textarea from '@mui/joy/Textarea';
import { AiChatSession } from '@/configs/AiModel';
import { JsonForms } from '@/configs/schema';
import moment from 'moment';
import { db } from '@/configs';
import { useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from '@/components/ui/toaster';
import { eq } from 'drizzle-orm';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function FormDialog() {
  const { toast } = useToast()
  const PROMPT = 'On the basis of description please give form in json format with form title, form subheading with form having Form field, form name, placeholder name, and form label, field Type, field required In Json format, in any case data should not be in array it should be in array of object instead.'



  const [open, setOpen] = React.useState(false);
  const [loading, setloading] = React.useState()
  const [variant, setVariant] = React.useState('soft');
  const route = useRouter()
  const { user } = useUser()


  const handleClickOpen = () => {
    setOpen(true);
  };
  const OnCreateForm = async () => {
    if (value === '') {

      toast({
        description: "Write an input to create form !",
      })
    }
    else {
      setloading(true)

      const result = await AiChatSession.sendMessage("Description" + value + PROMPT);
      console.log(result.response.text());
      if (result.response.text()) {
        const resp = await db.insert(JsonForms).values({
          jsonform: result.response.text(),
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD/MM/yyyy")
        }).returning({ id: JsonForms.id });
        console.log('new form id : ', resp[0].id);
        if (resp[0].id) {
          route.push('/edit-form/' + resp[0].id)
        }
        setloading(false)
      }
      setloading(false)
    }
  }

  const handleClose = () => {
    setOpen(false);
    setvalue('')
  };

  const [value, setvalue] = React.useState('')
  const [jsonFormData, setjsonFormData] = React.useState()
  React.useEffect(() => {
    user && GetFormData()
   
  }, [user])


  const GetFormData = async () => {
    const result = await db.select().from(JsonForms).where(eq(JsonForms?.createdBy, user?.primaryEmailAddress?.emailAddress))
    setjsonFormData(result)
    console.log(result)

  }


  return (
    <div>
      <Toaster />
     
      {jsonFormData?.length == 3 ?

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><Button className='cursor-not-allowed hover:bg-zinc-400'> + Create Form</Button></TooltipTrigger>
            <TooltipContent className='select-none bg-indigo-700 text-white font-light'>
              <p >Upgrade Subscription to create more ai forms✨</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        : < Button className=' text-base' onClick={handleClickOpen}>
          + Create Form
        </Button>}

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Create Form </DialogTitle>
        <DialogContent className='w-[30rem] '>


          <Textarea
            minRows={5}
            placeholder="write description for your form..."
            variant="soft"
            value={value}
            onChange={(e) => setvalue(e.target.value)}
            className='pt-3' />
        </DialogContent>
        <DialogActions>
          <Button size="md" variant={variant} color="danger" onClick={handleClose}>
            Cancel
          </Button>

          <Button variant='soft' color="success" onClick={OnCreateForm} >{loading ? <Loader2 className='animate-spin' /> : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}
