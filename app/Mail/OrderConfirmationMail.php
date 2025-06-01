<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $orderResult;

    /**
     * Create a new message instance.
     */
    public function __construct($orderResult)
    {
        $this->orderResult = $orderResult;
    }


    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }

    public function build()
    {
        return $this->subject('Order Confirmation')
            ->view('emails.order_confirmation')
            ->with(['orderResult' => $this->orderResult]);
    }
}
